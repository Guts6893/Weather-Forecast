# Weather Forecast

Weather Forecast is a web application that displays real-time weather information for a given location. It shows the current temperature, humidity, and wind speed, along with a visual weather icon representing the current conditions. The app fetches data from the OpenWeather API and is built using ReactJS and CSS.

## Tech Stack 

- ReactJS
- CSS
- HTML

## Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Guts6893/Weather-Forecast.git
    cd Weather-Forecast
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm start
    ```

4. Go to the Web browser and open below link to view the application:
    ```
    http://localhost:3000
    ```

## Usage

Once the application is running, you can use it by entering the desired location in the search bar to get the information about weather of desired location 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Deployment

Weather Forecast is deployed using GitHub Pages and can be accessed at [Weather Forecast](https://Guts6893.github.io/Weather-Forecast/).

To deploy your own version of Weather Forecast using GitHub Pages, follow these steps:

1. Ensure your `homepage` field in `package.json` is set to:

    ```json
    "homepage": "https://Guts6893.github.io/Weather-Forecast"
    ```

2. Build the project:

    ```bash
    npm run build
    ```

3. Deploy the `build` directory to the `gh-pages` branch:

    ```bash
    npm install -g gh-pages
    gh-pages -d build
    ```

Your project will be available at: https://Guts6893.github.io/Weather-Forecast

## Acknowledgments

- Special thanks to [OpenWeather](https://openweathermap.org/) for their API.
