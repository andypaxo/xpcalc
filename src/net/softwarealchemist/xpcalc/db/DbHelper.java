package net.softwarealchemist.xpcalc.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

public class DbHelper extends SQLiteOpenHelper {

	public DbHelper(Context context, String name, CursorFactory factory, int version) {
		super(context, name, factory, version);
	}
	
	

	@Override
	public void onOpen(SQLiteDatabase db) {
		super.onOpen(db);
		db.execSQL("PRAGMA foreign_keys=ON;");
	}



	@Override
	public void onCreate(SQLiteDatabase db) {
		
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		db.beginTransaction();

		for (int i = oldVersion; i < newVersion; i++)
			db.execSQL(migrations[i]);
		
		db.setTransactionSuccessful();
		db.endTransaction();
	}
	
	public int getVersion() {
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
		
		"CREATE TABLE Reward"
		+ "id INTEGER PRIMARY KEY,"
		+ "xpAmount INTEGER,"
		+ "shouldBeApplied INTEGER,"
		+ "encounter_id INTEGER,"
		+ "character_id INTEGER,"
		+ "FOREIGN KEY (encounter_id) REFERENCES Encounter(id) DEFERRABLE INITIALLY DEFERRED,"
		+ "FOREIGN KEY (character_id) REFERENCES Character(id) DEFERRABLE INITIALLY DEFERRED);",
	};
}
