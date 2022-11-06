#!/usr/bin/env node

//Dependencies 

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist'; 
//const timezone = moment.tz.guest()

const args = minimist(process.argv.slice(2))
console.log(args)

// Default action 

if (args.h){
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)

process.exit(0)
}

console.log(args.n)
let latitude = args.n||args.s
let longitude = args.w||args.e
console.log(latitude)
console.log(longitude)

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m,relativehumidity_2m,precipitation,surface_pressure&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&past_days=7');

const data = await response.json();

//console.log(data);

const days = args.d

if (days == 0){
console.log("today.")
} else if (days > 1) {
console.log("in" + days + "days.")
} else {
console.log("tomorrow.")
}
