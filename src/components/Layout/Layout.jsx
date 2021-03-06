import Head from "next/head";

import "./Layout.scss";
import "./Formulary.scss";
import "./CustomTable.scss";

export default ({ children, title = "Fernando Vaca Tamayo Blog" }) => {
    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="description" content="I'm Fernando and this is my blog, where i share my knownledge and the things that i like."></meta>

                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/atom-one-dark.min.css" /> */}
            </Head>

            { children }

            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
            <script src="https://kit.fontawesome.com/63ef8f1397.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
        </div>
    );
}