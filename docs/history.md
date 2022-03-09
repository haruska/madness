# Project History


I've participated in this pool since the early 90's when it was on paper. Participants would get collated xerox copies of all the brackets from participants. After every game, we'd go through each bracket to highlight correct picks and cross out incorrect ones.

With the internet, eventually we moved to a paid online system called [hoopness](https://hoopness.com/pool/site/login.html) (site is still up!) As of 2022, it looks **exactly** the same as it did in circa 2000. This was a big win for collecting brackets vs pen and paper with the xerox machine. Still, it left a lot to be desired.

## Development cycles

From a development perspective, this is an interesting project. There is a flurry of activity for 3-4 weeks leading up to the tournament. It's deployed to a production environment. The tournament runs for 3 weeks and then the project is shut back down.

This provides a good mix of being able to maintain something without having daily active users. However, it presents some challenges. General knowledge about how the code works is re-learned every year. Invariably, best practices change and tech stacks get out of date.

## Technology history

When this project started in 2013 it was a simple rails app. By 2015, a GraphQL API was added and the front-end was replaced largely by React. This was pretty much in line with my tech explorations professionally. Everything got more complex over time. 

DevOps Deployment was to a mix of heroku and aws. CDN management, Auth0 (and JWT) for authentication. 

The ruby/rails ecosystem… cancan, followed by cancancan, followed by pundit. Resque, SideKiq, ActiveJob (on Sidekiq) for job management. Rails love/hate relationship with javascript… rjs, webpacker, js-builder.

The javascript ecosystem… React moving from classes to functions with hooks. Pre create-react-app (and pre-lockfile) npm package management. Followed by yarn.

Various saas products… airbrake, new relic, hirefire, redistogo, circleci, sendgrid, cloudflare

__All of this to say, the cognitive load to just "stay current" was way higher than improving the application__


Things came to a head during the pandemic. I was experimenting with serverless lambda functions and react-native. The plan was to write this project again using the serverless stack and deploy to aws. At the same time, I needed a better design for the bracket on mobile. 

It all came crashing down. For 2021 we didn't even use this software, opting for using CBS. I figured I didn't want this project taking up any more of my time. Using CBS was underwhelming. Their goals are advertisements...mine is running a pool.

So, for 2022 a new plan. Resurrect the code from 2017-2019 and simplify it. A single pool, no history of past tournaments, a single admin. Remove payments, partial brackets, tiebreakers. Store less calculations (cache more.) Move everything into a single rails project. Deploy to heroku. Use only heroku postgres and redis as data stores. Simplify monitoring to a single product (sentry.io). Remove Auth0 and JWT management. Gmail SMTP for emails. Github for project management and CI/CD. Heroku Use a rails admin dashboard for the bulk of admin work.
