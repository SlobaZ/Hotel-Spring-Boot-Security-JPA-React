package hotel.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class AuxiliaryClass {

	
	public static SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("dd.MM.yyyy. HH:mm");

	
	
	// Upisi sadasnji Sql datum i vreme
	public static java.sql.Timestamp EntriesPresentDateAndTimeSql() {
		Date date = new Date();
		Timestamp dateTimeNow = new Timestamp(date.getTime());
		return dateTimeNow;
	}

	
	
	// Konvertuj Sql datum i vreme u String
	public static String ViewsTextualDateTime(Timestamp dateTime) {
		String text = DATE_TIME_FORMAT.format(dateTime);
		// String text = dateTime.toString();
		return text;
	}
	
	
	
	// Konvertuj String u Sql datum i vreme
	public static java.sql.Timestamp ConvertStringToSqlDateAndTime(String text) {
		java.sql.Timestamp dateTime = null;
		try {
			Date date = (Date) DATE_TIME_FORMAT.parse(text);
			dateTime = new Timestamp(date.getTime());
			return dateTime;
		} catch (Exception ex) {
			System.out.println("ERROR");
		}

		return dateTime;
	}

	
	
	
	// Racunanje broja dana
	public static double TheNumberOfDays(String entrance, String exit) {
		Date Date1 = null;
		Date Date2 = null;
		try {
			Date1 = DATE_TIME_FORMAT.parse(entrance);
			Date2 = DATE_TIME_FORMAT.parse(exit);
		} catch (ParseException e) {

			e.printStackTrace();
		}
		long start = Date1.getTime();
		long end = Date2.getTime();
		long difference = end - start;
		int countDays = (int) (difference / (1000 * 60 * 60 * 24));

		return (double) (countDays);

	}

	
	
	// Racunanje cene
	public static double price(double numberOfDays, String nameRooms) {
		double pricePerDay = 0;
		if (nameRooms.equals("Single 01") || nameRooms.equals("Single 02")) {
			pricePerDay = 2000.0;
		} else if (nameRooms.equals("Double 01") || nameRooms.equals("Double 02") || nameRooms.equals("Double 03")
				|| nameRooms.equals("Double 04")) {
			pricePerDay = 2500.0;
		} else if (nameRooms.equals("Triple 01") || nameRooms.equals("Triple 02")) {
			pricePerDay = 3500.0;
		} else if (nameRooms.equals("Family room 01") || nameRooms.equals("Family room 02")) {
			pricePerDay = 2500.0;
		} else if (nameRooms.equals("Suite 01") || nameRooms.equals("Suite 02")) {
			pricePerDay = 3000.0;
		}
		double totalPrice = numberOfDays * pricePerDay;
		return totalPrice;
	}

	
	
	// Provera opsega Ulaz/Izlaz datuma
	public static boolean correspondsToTheRange(String entryLimit, String outputLimit) {

		boolean belong = true;
		Date entryDate = null;
		Date outputDate = null;
		Date today = null;
		String currentDate = null;

		Date dateToday = new Date();
		currentDate = DATE_TIME_FORMAT.format(dateToday);

		try {
			entryDate = DATE_TIME_FORMAT.parse(entryLimit);
			outputDate = DATE_TIME_FORMAT.parse(outputLimit);
			today = DATE_TIME_FORMAT.parse(currentDate);

			if (entryDate.before(outputDate) && !entryDate.before(today)) {
				belong = true;
			} else if (entryDate.before(today)) {
				belong = false;

			} else {
				belong = false;
			}

		} catch (ParseException e) {
		}

		return belong;
	}

	
	
	// Dodeli sifru
	public static String AssignCode() {
		Random r = new Random();
		int min = 100;
		int max = 999;

		char randomCharLetter;
		int randomNumber;
		randomCharLetter = (char) (r.nextInt(26) + 'A');
		randomNumber = (int) ((Math.random() * (max - min)) + min);

		if (randomCharLetter == '\u0000' || randomNumber == 0) {
			randomCharLetter = (char) (r.nextInt(26) + 'A');
			randomNumber = (int) ((Math.random() * (max - min)) + min);
		}

		String code = randomCharLetter + " " + randomNumber;
		return code;

	}

}
