import App from './app';
import globalErrorHandlers from '../shared/globalErrorHandlers';

globalErrorHandlers();

if (require.main === module) {
    const app = new App();

    app.run();
}

export default App;
