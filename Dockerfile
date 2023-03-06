FROM ruby:3.1.3

ENV SVC_ENV="production" \
    SVC_PORT="3000" \
    SVC_DIR="/srv/app" \
    BUNDLE_PATH="/srv/bundler" \
    BUILD_PACKAGES="build-essential libpq-dev" \
    APP_PACKAGES="bash curl git vim netcat tzdata apt-utils postgresql-client locales"

# Thes env var definitions reference values from the previous definitions, so they need to be split off on their own.
# Otherwise, they'll receive stale values because Docker will read the values once before it starts setting values.
ENV BUNDLE_BIN="${BUNDLE_PATH}/bin" \
    GEM_HOME="${BUNDLE_PATH}" \
    PATH="${SVC_DIR}:${BUNDLE_BIN}:${PATH}"

ENV RAILS_ENV="${SVC_ENV}" \
    NODE_ENV="${SVC_ENV}" \
    PATH="${PATH}:${SVC_DIR}/.bin"

RUN mkdir -p $SVC_DIR ${SVC_DIR}/.bin $BUNDLE_PATH
WORKDIR $SVC_DIR

RUN echo "Acquire::Check-Valid-Until \"false\";\nAcquire::Check-Date \"false\";" | cat > /etc/apt/apt.conf.d/10no--check-valid-until
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -q -y $BUILD_PACKAGES
RUN DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -q -y $APP_PACKAGES

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*


# Install yarn 2
#RUN npm i -g corepack
#RUN corepack prepare yarn@3.4.1 --activate
RUN corepack enable --install-directory ${SVC_DIR}/.bin
RUN corepack prepare yarn@stable --activate


COPY package.json .yarnrc.yml yarn.lock $SVC_DIR
RUN mkdir -p $SVC_DIR/.yarn/plugins/@yarnpkg/
COPY .yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs $SVC_DIR/.yarn/plugins/@yarnpkg/

RUN yarn install

COPY Gemfile* $SVC_DIR/
RUN bundle install

COPY . $SVC_DIR/

ENTRYPOINT ["entrypoint.sh"]

CMD ["app"]

EXPOSE $SVC_PORT