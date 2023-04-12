import React, {useEffect} from 'react';

const MicroFrontend = ({name, host, document, window, history}) => {

    const renderMicroFrontend = () => {
        if (window[`render${name}`])
            window[`render${name}`](`${name}-container`, true, history);
    };

    useEffect(() => {

        const scriptID = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptID)) {
            renderMicroFrontend();
            return;
        }

        fetch(`http://${host}/asset-manifest.json`)
            .then(res => res.json())
            .then(manifest => {
                const script = document.createElement('script');
                script.id = scriptID;
                script.crossOrigin = '';
                script.src = `//${host}${manifest.files['main.js']}`;
                console.log(script.src)
                script.onload = renderMicroFrontend;
                document.head.appendChild(script);
            }).catch(e => console.error(e));

        return () => {

            if (window[`unmount${name}`])
                window[`unmount${name}`](`${name}-container`);
        }


    }, [])

    return <main id={`${name}-container`}/>;
}


MicroFrontend.defaultProps = {
    document,
    window,
};

export default MicroFrontend;
