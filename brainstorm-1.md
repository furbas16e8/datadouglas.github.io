````mermaid
flowchart LR
    subgraph HTML["index.html"]
        HEAD["<head>"]
        BODY["<body>"]
    end

    subgraph Assets["assets/"]
        CSS["css/main.css"]
        JS1["js/components.js"]
        JS2["js/app.js"]
        IMG["img/perfil.jpeg"]
    end

    subgraph CDN["CDNs Externos"]
        TW["Tailwind CDN"]
        REACT["React 18"]
        RR["React Router"]
        BABEL["Babel Standalone"]
        FONTS["Google Fonts"]
    end

    HEAD --> TW & REACT & RR & BABEL & FONTS
    HEAD --> CSS
    BODY --> JS1 --> JS2
    JS1 & JS2 -.-> IMG

    style IMG fill:#22c55e,color:#fff
    ```
````
