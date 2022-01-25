II Open Xacobeo Website
=========================

Based on [Grayscale Jekyll theme](https://github.com/jeromelachaud/grayscale-theme).

## Development environment

To install the development gems, just run `bundle install`.

To run the development server, use `bundle exec jekyll serve`.

## Deployment environment

Install the gems locally:

    bundle config set --local deployment 'true'
    bundle install

Then build the website:

    bundle exec jekyll build
