package net.softwarealchemist.xpcalc;

import java.util.List;

import net.softwarealchemist.xpcalc.domain.Campaign;
import net.softwarealchemist.xpcalc.domain.Character;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;

public class CharacterListingFragment extends Fragment {
	private Campaign campaign;
	private CharacterListAdapter adapter;
	
	public void setCampaign(Campaign campaign) {
		this.campaign = campaign;
	}

	public CharacterListingFragment(){
		campaign = new Campaign();
	}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        GridView rootView = (GridView) inflater.inflate(R.layout.fragment_character_list, container, false);
		adapter = new CharacterListAdapter(this.getActivity(), campaign.characters);
        rootView.setAdapter(adapter);
        return rootView;
    }
    
    public void reload() {
    	adapter.notifyDataSetChanged();
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