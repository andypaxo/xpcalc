package net.softwarealchemist.xpcalc;

import net.softwarealchemist.xpcalc.domain.Character;
import android.content.Context;
import android.util.AttributeSet;
import android.widget.GridLayout;
import android.widget.TextView;

public class LayoutCharacterTile extends GridLayout {

    public LayoutCharacterTile(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	@Override
    protected void onMeasure(final int widthMeasureSpec, final int heightMeasureSpec)
    {
		super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

	public void bindTo(Character character) {
		((TextView)findViewById(R.id.label_name)).setText(character.name);
		((TextView)findViewById(R.id.label_level)).setText(Integer.toString(character.level));
		((TextView)findViewById(R.id.label_xp)).setText(Integer.toString(character.xp));
	}
}
