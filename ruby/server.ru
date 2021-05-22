require 'bundler/setup'
require 'rack'

require 'sinatra/base'
require 'sinatra/sse'

class TimeServer < Sinatra::Base
  include Sinatra::SSE

  get '/' do
    send_file 'index.html'
  end

  get '/stream' do
    @id = 0
    sse_stream do |out|
      EM.add_periodic_timer(1) do
        out.push(id: "#{@id += 1}",event: 'message', data: rand(1..1000).to_s)
      end
    end
  end
end

run TimeServer.new
