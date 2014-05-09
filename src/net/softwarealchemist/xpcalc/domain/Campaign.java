package net.softwarealchemist.xpcalc.domain;

import java.util.ArrayList;
import java.util.List;

public class Campaign extends Entity {

	public List<Character> characters;
	public List<Encounter> encounters;
	
	public Campaign () {
		characters = new ArrayList<Character>();
		encounters = new ArrayList<Encounter>();
	}
}
