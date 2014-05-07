package net.softwarealchemist.xpcalc;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.RelativeLayout;

public class LayoutCharacterTile extends RelativeLayout {

    public LayoutCharacterTile(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	@Override
    protected void onMeasure(final int widthMeasureSpec, final int heightMeasureSpec)
    {
		super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}
