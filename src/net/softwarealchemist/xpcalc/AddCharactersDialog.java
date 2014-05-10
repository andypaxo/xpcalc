package net.softwarealchemist.xpcalc;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;

public class AddCharactersDialog implements OnClickListener {
	
	private int[] characterCounts;
	private int characterCount = 1;
	private AlertDialog dialog;
	private AddCharactersCallback callback;

	public AddCharactersDialog(Context context, final AddCharactersCallback callback) {
		characterCounts = context.getResources().getIntArray(R.array.array_character_count);

		this.callback = callback;
		
		dialog = new AlertDialog.Builder(context)
			.setTitle("Number of characters")
			.setItems(R.array.array_character_count_labels, this)
			.create();
	}
	
	public void show() {
		dialog.show();
	}

	@Override
	public void onClick(DialogInterface dialog, int which) {
		characterCount = characterCounts[which];
		callback.AddCharacters(characterCount);
	}
}
