use std::{
    fs,
    net::{TcpListener, TcpStream},
    io::{prelude::*, BufReader},
    thread
};
use Web::ThreadPool;

fn main() {
    let http_port = TcpListener::bind("192.168.0.104:80").unwrap();
    //let https_port = TcpListener::bind("192.168.0.104:443").unwrap();
    let pool = ThreadPool::new(3);

    for stream in http_port.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
        
    }
    /*for stream in https_port.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
        
    }*/
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (mut status_line, filename) = if request_line.contains("GET") {
        let request_line_parts: &Vec<&str> = &request_line.split(' ').collect();
        let mut filesource = request_line_parts[1];

        if filesource == "/" {
            filesource = "index.html"
        }
        filesource = filesource.trim_start_matches("/");

        let file_prfx: &'static str = "../";

        //let filesource = file_prfx.to_owned() + filesource;
        


        ("HTTP/1.1 200 OK", filesource)
    } else {
        ("HTTP/1.1 404 NOT FOUND", "../index.html")
    };

    let contents = fs::read_to_string(filename).unwrap_or_else(|error| {
        status_line = "HTTP/1.1 404 NOT FOUND";
        let error_response = error.to_string();
        error_response
    });

    let length = contents.len();

    let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
    
    /*if request_line == "GET / HTTP/1.1" {
        let status_line = "HTTP/1.1 200 OK";
        let contents = fs::read_to_string("index.html").unwrap();
        let length = contents.len();

        let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

        stream.write_all(response.as_bytes()).unwrap();
    } else {
        let status_line = "HTTP/1.1 500 OK";
        let contents = String::from("Can't handle that request, yet");
        let length = contents.len();

        let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

        stream.write_all(response.as_bytes()).unwrap();
    }*/

    /*let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    println!("Request: {http_request:#?}");*/

    
}
