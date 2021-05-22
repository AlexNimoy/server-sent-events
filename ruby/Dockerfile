FROM ruby:2.7.2
RUN apt-get update -qq && apt-get install -y ruby-dev
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app

EXPOSE 8086
