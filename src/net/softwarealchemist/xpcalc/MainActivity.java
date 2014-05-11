package net.softwarealchemist.xpcalc;

import java.util.List;

import net.softwarealchemist.xpcalc.db.Repository;
import net.softwarealchemist.xpcalc.domain.Campaign;
import net.softwarealchemist.xpcalc.domain.Character;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends Activity implements AddCharactersCallback {

    private Campaign campaign;
	private CharacterListingFragment characterListingFragment;

	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState == null) {
            characterListingFragment = new CharacterListingFragment();
			getFragmentManager().beginTransaction()
                    .add(R.id.container, characterListingFragment)
                    .commit();
			campaign = loadDefaultCampaign();
			characterListingFragment.setCampaign(campaign);
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_add_character) {
        	new AddCharactersDialog(this, this).show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }


	private Campaign loadDefaultCampaign() {
		final Repository repository = new Repository(this);
    	final List<Campaign> campaigns = repository.getCampaignInfo();
    	final Campaign campaign = repository.loadCampaign(campaigns.get(0).id);
    	return campaign;
	}

	@Override
	public void AddCharacters(int amount) {
		for (int i = 0; i < amount; i++) {
			addCharacter(campaign.characters, "foo", i+1);
		}
		characterListingFragment.reload();
	}

	private void addCharacter(List<Character> characterList, final String name, int level) {
		final Character character = new Character();
		character.name = name;
		character.level = level;
		characterList.add(character);
	}

}
