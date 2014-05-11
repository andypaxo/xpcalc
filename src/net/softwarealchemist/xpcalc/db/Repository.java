package net.softwarealchemist.xpcalc.db;

import java.util.ArrayList;
import java.util.List;

import net.softwarealchemist.xpcalc.domain.Campaign;
import net.softwarealchemist.xpcalc.domain.Character;
import net.softwarealchemist.xpcalc.util.L;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class Repository {
	private DbHelper dbHelper;
	private SQLiteDatabase readDb;
	private SQLiteDatabase writeDb;

	public Repository(Context context) {
		dbHelper = new DbHelper(context);
	}

	private void startRead() {
		if (readDb == null)
			readDb = dbHelper.getReadableDatabase();
	}

	private void startWrite() {
		if (writeDb == null)
			writeDb = dbHelper.getWritableDatabase();
	}
	
	public List<Campaign> getCampaignInfo() {
		startRead();
		final ArrayList<Campaign> result = new ArrayList<Campaign>();
		final Cursor c = readDb.query(
			"Campaign",
			new String[] { "id", "name" },
			null, null, null, null,
			"id ASC");
		while (c.moveToNext()) {
			final Campaign campaign = new Campaign();
			campaign.id = c.getLong(0);
			campaign.name = c.getString(1);
			result.add(campaign);
		}
		return result;
	}

	public Campaign loadCampaign(long id) {
		startRead();
		Campaign result = new Campaign();
		final Cursor c = readDb.query(
			"Campaign",
			new String[] { "id", "name" },
			"id = ?",
			new String[] { String.valueOf(id) },
			null, null, null);
		c.moveToFirst();
		result.id = c.getLong(0);
		result.name = c.getString(1);
		loadCharacters(result.characters, id);
		return result;
	}

	private void loadCharacters(List<Character> characters, long campaignId) {
		startRead();
		final Cursor c = readDb.query(
				"Character",
				new String[] {"id", "name", "level", "levelAdjustment", "xp"},
				"campaign_id = ?",
				new String[] { String.valueOf(campaignId) },
				null, null, null);
		while (c.moveToNext()) {
			Character character = new Character();
			character.id = c.getLong(0);
			character.name = c.getString(1);
			character.level = c.getInt(2);
			character.levelAdjustment = c.getInt(3);
			character.xp = c.getInt(4);
			characters.add(character);
		}
	}

	public void saveCharacters(Campaign campaign) {
		startWrite();
		try {
			writeDb.beginTransaction();
			for (Character character : campaign.characters) {
				if (character.isNew())
					insert(character, campaign);
				else
					update(character);
			}
			writeDb.setTransactionSuccessful();
		} finally {
			writeDb.endTransaction();
		}
	}

	private void insert(Character character, Campaign campaign) {
		L.og("Adding %s", character.name);
		ContentValues values = new ContentValues();
		values.put("campaign_id", campaign.id);
		values.put("name", character.name);
		values.put("level", character.level);
		values.put("levelAdjustment", character.levelAdjustment);
		values.put("xp", character.xp);
		writeDb.insert("Character", null, values);
	}
	
	private void update(Character character) {
		L.og("Updating %s", character.name);
		ContentValues values = new ContentValues();
		values.put("name", character.name);
		values.put("level", character.level);
		values.put("levelAdjustment", character.levelAdjustment);
		values.put("xp", character.xp);
		writeDb.update("Character", values, "id = ?", new String[] { String.valueOf(character.id) });
	}
}
