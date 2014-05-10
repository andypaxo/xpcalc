package net.softwarealchemist.xpcalc.db;

import net.softwarealchemist.xpcalc.util.L;
import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DbHelper extends SQLiteOpenHelper {

	public DbHelper(Context context) {
		super(context, "xpcalc.db", null, getVersion());
	}
	
	

	@Override
	public void onOpen(SQLiteDatabase db) {
		super.onOpen(db);
		db.execSQL("PRAGMA foreign_keys=ON;");
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		onUpgrade(db, 0, getVersion());
		setupFirstTimeData(db);
	}

	private void setupFirstTimeData(SQLiteDatabase db) {
		db.beginTransaction();
		try {
			final ContentValues values = new ContentValues();
			values.put("name", "Campaign");
			if (db.insert("Campaign", null, values) == -1)
				L.og("Initial insert failed");
			
			db.setTransactionSuccessful();
		} finally {
			db.endTransaction();
		}
	}



	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		db.beginTransaction();
		try {
			L.og("Upgrading from %d to %d", oldVersion, newVersion);
	
			for (int i = oldVersion; i < newVersion; i++)
				db.execSQL(migrations[i]);
			
			db.setTransactionSuccessful();
		} finally {
			db.endTransaction();
		}
	}
	
	public static int getVersion() {
		return migrations.length;
	}

	public static final String[] migrations = new String[] {
		"CREATE TABLE Campaign ("
		+ "id INTEGER PRIMARY KEY,"
		+ "name TEXT);",
		
		"CREATE TABLE Character ("
		+ "id INTEGER PRIMARY KEY,"
		+ "name TEXT,"
		+ "level INTEGER,"
		+ "levelAdjustment INTEGER,"
		+ "xp INTEGER,"
		+ "campaign_id INTEGER,"
		+ "FOREIGN KEY (campaign_id) REFERENCES Campaign(id) DEFERRABLE INITIALLY DEFERRED);",
		
		"CREATE TABLE Encounter ("
		+ "id INTEGER PRIMARY KEY,"
		+ "date INTEGER,"
		+ "campaign_id INTEGER,"
		+ "FOREIGN KEY (campaign_id) REFERENCES Campaign(id) DEFERRABLE INITIALLY DEFERRED);",
		
		"CREATE TABLE Foe ("
		+ "id INTEGER PRIMARY KEY,"
		+ "challengeRating REAL,"
		+ "quantity INTEGER,"
		+ "encounter_id INTEGER,"
		+ "FOREIGN KEY (encounter_id) REFERENCES Encounter(id) DEFERRABLE INITIALLY DEFERRED);",
		
		"CREATE TABLE Reward ("
		+ "id INTEGER PRIMARY KEY,"
		+ "xpAmount INTEGER,"
		+ "shouldBeApplied INTEGER,"
		+ "encounter_id INTEGER,"
		+ "character_id INTEGER,"
		+ "FOREIGN KEY (encounter_id) REFERENCES Encounter(id) DEFERRABLE INITIALLY DEFERRED,"
		+ "FOREIGN KEY (character_id) REFERENCES Character(id) DEFERRABLE INITIALLY DEFERRED);",
	};
}
