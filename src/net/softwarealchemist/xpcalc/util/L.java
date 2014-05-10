package net.softwarealchemist.xpcalc.util;

import android.util.Log;

public class L {
	public static void og(String message, Object... args) {
		Log.d("xpcalc", String.format(message, args));
	}
}
