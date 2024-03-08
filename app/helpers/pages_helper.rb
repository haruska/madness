# frozen_string_literal: true

module PagesHelper
  def fibonacci(n)
    return n if n <= 1

    fibonacci(n - 1) + fibonacci(n - 2)
  end
end
