import App from './server/app';
import globalErrorHandlers from './server/globalErrorHandlers';

globalErrorHandlers();

if (require.main === module) {
    const app = new App();

    app.run();
}

export default App;
