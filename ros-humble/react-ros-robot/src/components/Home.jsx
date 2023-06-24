import Connection from './Connection';

function Home() {
    return (
        <main>
            <h1 className="text-center mt-3">Robot Control Page</h1>
            <p className="text-center">Test App for Bumpybot Ros Navigation Interface</p>
            <Connection />
        </main>
    );
}

export default Home;