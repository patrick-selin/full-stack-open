sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Sends POST reguest with JSON data

    activate server
    server-->>browser: Server responds with status code 201 created
    deactivate server

    Note right of browser: The browser creates new DO< with the the JS code that was fetched before git 