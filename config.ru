require "pathname"
root = Pathname.new(File.dirname(__FILE__)).join("site")
AJAX = root.join("katz.html")

class SlowPage
  def initialize(app)
    @app = app
  end

  def call(env)
    if env["PATH_INFO"] == "/index.html"
      system "staticmatic build ."
      @app.call(env)
    elsif env["PATH_INFO"] == "/ajax.html"
      sleep 1
      [200, {"Content-Type" => "text/html"}, [File.read(AJAX)]]
    else
      @app.call(env)
    end
  end
end

use SlowPage
use Rack::Static, :urls => ["/"], :root => root
run proc {|env| [200, {"Content-Type" => "text/html"}, ["Hello world"]]}