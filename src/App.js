import React from "react";
import "./App.css";
import happy from "./happy.gif";
import sad from "./sad.gif";
import loading from "./loading.gif";

function reverseString(str) {
	return str.split("").reverse().join("");
}

function isPalindrome(str) {
	var reverseStr = reverseString(str);
	return str === reverseStr;
}

function checkPalindromeForAllFormats(date) {
	var listOfFormats = getDateFormats(date);

	var flag = false;
	for (let i = 0; i < listOfFormats.length; i++) {
		if (isPalindrome(listOfFormats[i])) {
			flag = true;
			break;
		}
	}
	return flag;
}

function getDateFormats(date) {
	var dateStr = convertDateToString(date);

	var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
	var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
	var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
	var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
	var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
	var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function convertDateToString(date) {
	var newDate = {
		day: "",
		month: "",
		year: "",
	};

	if (date.day < 10) {
		newDate.day = "0" + date.day;
	} else {
		newDate.day = date.day.toString();
	}

	if (date.month < 10) {
		newDate.month = "0" + date.month;
	} else {
		newDate.month = date.month.toString();
	}

	newDate.year = date.year.toString();

	return newDate;
}

function App() {
	const [birthday, setBirthday] = React.useState();
	const [isCalculating, setCalculating] = React.useState(false);
	const [message, setMessage] = React.useState();
	const [imageSrc, setImageSrc] = React.useState();

	const checkPalindrome = () => {
		if (birthday === undefined) {
			alert("Please enter a valid date");
			return;
		}

		setCalculating(true);

		setTimeout(() => {
			setCalculating(false);
		}, 3000);

		if (birthday !== "") {
			var listOfDate = birthday.split("-");

			var date = {
				day: Number(listOfDate[2]),
				month: Number(listOfDate[1]),
				year: Number(listOfDate[0]),
			};
			var answer = checkPalindromeForAllFormats(date);
			if (answer) {
				setMessage("Congratulations! Your birthday is Palindrome");
				setImageSrc(() => happy);
			} else {
				setMessage("Your birthday is not Palindrome");
				setImageSrc(() => sad);
			}
		}
	};
	return (
		<div className="App">
			<h1>Pallindrome Birthday</h1>
			<h4>Enter your birthday</h4>
			<input
				type="date"
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
			></input>
			<img src={isCalculating ? loading : imageSrc} />

			<button onClick={checkPalindrome}>Show</button>
			{isCalculating ? <div>wait</div> : <div>{message}</div>}
			<img></img>
		</div>
	);
}

export default App;
