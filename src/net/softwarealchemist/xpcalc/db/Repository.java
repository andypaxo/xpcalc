package net.softwarealchemist.xpcalc.db;

import java.util.ArrayList;
import java.util.List;

import net.softwarealchemist.xpcalc.domain.Campaign;
import net.softwarealchemist.xpcalc.domain.Character;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class Repository {
	private DbHelper dbHelper;
	private SQLiteDatabase readDb;

	public Repository(Context context) {
		dbHelper = new DbHelper(context);
	}

	private void startRead() {
		if (readDb == null)
			readDb = dbHelper.getReadableDatabase();
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
}
