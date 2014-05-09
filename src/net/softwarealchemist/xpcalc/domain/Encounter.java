package net.softwarealchemist.xpcalc.domain;

import java.util.Date;
import java.util.List;

public class Encounter extends Entity {
	public List<Foe> foes;
	public List<Reward> rewards;
	public Date date;
}
