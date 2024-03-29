<!-- prettier-ignore -->
# ConnectLab's Front-End v2

This project is the second big challenge from DEVinHouse course in collaboration with the company Intelbras, where the proposition was to create a web application to manage IOT devices using Vite + React in the given time period of 16 days.

## Getting Started

- `main` branch contains aggregate code of all branches
- `development` branch WILL contain code under development

## Prerequisites

- Node.js
- npm or yarn

## Installation

To install the necessary dependencies, run the following command:

```bash
$ npm install or yarn install
```

## Running the Application

To start the development server, run the following command:

```bash
$ npm run dev or yarn dev
```

The application will start on http://localhost:5173.

## Components

The application is build using functional components and hooks.

## Development

### Requirements / Features

<!-- prettier-ignore -->
```
1. A user registration page, containing the fields:
   ├── Full Name (required)
   ├── Photo URL (optional)
   ├── Email (required)
   └── Password (required)
   │    └──Minimum of 8 characters (letters, numbers and/special characters)
   │ 
   ├──Password Validation (required)
   ├──Telephone (optional)
   └──Address
      ├── Zipcode (required)
      ├── Street/Address (required)
      ├── Number (required)
      ├── Neighborhood (required)
      ├── City (required)
      ├── State (required)
      └── Add-on (optional)


   The address data must be pre-filled by consulting the CEP through the ViaCEP API of IBGE Brazil.
   Required and optional fields must be validated in the onSubmit method.
   When registering the user, show a feedback message from the registered user successfully. 
   Tip: Use the onSubmit method with Try/Catch.
   Save the data using the available API API.

2. A login page containing an email and password field.
   │
   │──The onSubmit event must validate that the fields have been filled in, being:
   │  ├──Email (required)
   │  └──Password (required)
   │
   └──When validating the input fields, the user is redirected to the Home page.
      └──Validate that the email field received a true email, and that the password
       field is 8 or more characters long.

3. A navigation menu to be used in routes to the pages of:
   │──Start
   │──Adding Devices
   └──User profile

4. A Home page, containing:
   │
   │──A weather forecast component showing temperature, state (sunny, cloudy, rainy etc), 
   humidity and any other information you find relevant. 
   Use user address data to bring weather information.
   │
   │──List of devices added to the user's location (home, office, factory, etc.).
   │
   └──Add filters for the groups that the user has registered. Ex:
      │
      │──all devices
      │──bedroom
      │──Living room
      │──Kitchen
      └──Etc.

5. A way of detailing the devices that should appear when a device is clicked on the listing page.
   │
   │── a. You must create a detail page.
   │
   │── b. All device information added to the user profile should be displayed, for example:
   │    │
   │    │──Device Name
   │    │   └──Examples: Room Lamp, Office Led Tape, Temperature Sensor, Room Air Conditioning and etc.
   │    │  
   │    │──Device Type
   │    │   └──Examples: Lamp, Led Tape, Sensor, Air Conditioning and etc.
   │    │
   │    │──Device Manufacturer:
   │    │   └──Example: Intelbras
   │    │
   │    │──Device Status
   │    │   └──States: On or Off
   │    │
   │    └──Device Information:
   │        └──Examples:
   │            │──Lamp: 10 Watts
   │            │──LED strip: 5 Watts
   │            │──Temperature Sensor: 23ºC
   │            │──Air Conditioning: Cooling (if on)
   │            │──Etc
   │            │──Device IP
   │            └──Device MAC address
   │    
   └── c. Consume the data from the available API.

6. A device addition page where all devices registered in the system must be listed.
   │
   │──At the top there should be a search bar to search for a device.
   │
   │──Tip: You can also implement a filter button to filter by type.
   │
   │──Consume the data from the available API.
   │
   └──By clicking on the device, the user will be able to link the device through a modal or page.
      │
      │──Among the information there should be a button to link/add the device to the user profile.
      │
      │──When the link/add button is clicked, it should simulate a pairing time 
      (hint: use setTimeOut with randomly generated times between 5 and 20 seconds) 
      and add  the device to the user profile.
      │
      └──The user must choose the location and grouping (living room, kitchen, bedroom, etc.)
       of the device when connecting.

7. A user profile page, containing:
   │─User photo
   │   └──Use the image of the registration URL if it exists, or add a generic avatar if it doesn't exist
   │─Username
   │─User email
   │─User phone
   │   └──Add the phone if it exists, or hide the field if it doesn't exist
   │─user address
   │─Button/key to enable editing of all user data
   │   └──If activated, the user will be able to edit their information.
   └─Button to log out of the application.

8. Creation of a stylization (visual identity) of the system. Following the document, 
an example of the proposed application will be presented, containing wireframes (Low Fidelity Prototype)
and Figma links (High Fidelity Prototype). Use the example only to understand the model to be developed, 
but feel free to create your unique visual identity with colors and formats that you find most interesting 
and intuitive.
```

### Roadmap

The development strategy that I decided to go for while reading the projects requirements was the following:

1. Installing the required UI/UX focused libraries, and then proceeding to create all components and pages from figma's suggested layout.
2. Figuring out how ViaCEP's and OpenWeather's API'S works, and implementing it on the project.
3. Created all validations for the registration form using YUP and react-hook-form.
4. Created all communications between front-end and back-end using Axios and then added an authentication context that manages if the user is logged in or not.
5. Refactoring: Moved all functions using Axios into a custom hook called useAxios and called them on the required components.
6. Optimization: Finished styling the project and added toast notifications from react-toastify.

### Deploy

Project was deployed with github + netlify: [ConnectLab](https://connectlab.netlify.app)

## Author

#### Samuel Haro

- [GitHub](https://github.com/samuelharo97)
- [LinkedIn](https://www.linkedin.com/in/samuel-haro-b14551236/)

## Acknowledgments

#### [Thaís Bertoldo](https://github.com/thaiscristinabertoldo) and [Michael Nascimento](https://github.com/mikansc)

Special thanks to both of them for providing endless guidance and assistance in this (so far) three-month journey.
