package net.softwarealchemist.xpcalc.db;

import java.util.ArrayList;
import java.util.List;

import net.softwarealchemist.xpcalc.domain.Campaign;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class Repository {
	private DbHelper dbHelper;

	public Repository(Context context) {
		dbHelper = new DbHelper(context);
	}
	
	public List<Campaign> getCampaignInfo() {
		final ArrayList<Campaign> result = new ArrayList<Campaign>();
		final SQLiteDatabase db = dbHelper.getReadableDatabase();
		final Cursor c = db.query(
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
}
