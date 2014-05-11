package net.softwarealchemist.xpcalc.domain;

import java.util.ArrayList;
import java.util.List;

public class Campaign extends Entity {

	private static String[] defaultNames = new String[] { "Krusk", "Gimble", "Devis", "Jozan", "Eberk", "Vadania", "Regdar", "Tordek", "Ember", "Alhandra", "Soveliss", "Lidda", "Kerwyn", "Hennet", "Aramil", "Mialee", "Ialdabode", "Mitra", "Sandharrow", "Eulad", "Xerxes" };
	
	public List<Character> characters;
	public List<Encounter> encounters;
	public String name;
	
	public Campaign () {
		characters = new ArrayList<Character>();
		encounters = new ArrayList<Encounter>();
	}

	public void addCharacter() {
		final Character character = new Character();
		character.name = defaultNames[characters.size() % defaultNames.length];
		characters.add(character);
	}
}
