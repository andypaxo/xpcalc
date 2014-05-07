package net.softwarealchemist.xpcalc;

import java.util.ArrayList;
import java.util.List;

import net.softwarealchemist.xpcalc.domain.Character;
import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.choose_campaign, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            GridView rootView = (GridView) inflater.inflate(R.layout.fragment_character_list, container, false);
            
            
            List<Character> characterList = new ArrayList<Character>();
            addCharacter(characterList, "Tordek", 7);
            addCharacter(characterList, "Gimble", 7);
            addCharacter(characterList, "Mialee", 6);
            addCharacter(characterList, "Lidda", 7);
			CharacterListAdapter adapter = new CharacterListAdapter(this.getActivity(), characterList); 
            
            rootView.setAdapter(adapter);
            
            return rootView;
        }

		private void addCharacter(List<Character> characterList, final String name, int level) {
			final Character character = new Character();
			character.name = name;
			character.level = level;
			characterList.add(character);
		}
        
        private class CharacterListAdapter extends BaseAdapter {

        	List<Character> list;
        	Context context;

			public CharacterListAdapter(Context context, List<Character> list) {
				super();
				this.list = list;
				this.context = context;
			}

			@Override
			public int getCount() {
				return list.size();
			}

			@Override
			public Object getItem(int position) {
				return list.get(position);
			}

			@Override
			public long getItemId(int position) {
				// TODO Auto-generated method stub
				return 0;
			}

			@Override
			public View getView(int position, View convertView, ViewGroup parent) {
				LayoutInflater inflater = (LayoutInflater) context
						.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
			 
				View charView;
		 
				if (convertView == null) {
					charView = new View(context);
					charView = inflater.inflate(R.layout.tile_character, null);
		 			 
				} else {
					charView = (View) convertView;
				}
		 
				((LayoutCharacterTile)charView).bindTo(list.get(position));
				return charView;
			}
        	
        }
    }

}