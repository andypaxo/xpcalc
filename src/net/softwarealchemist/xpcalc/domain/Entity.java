package net.softwarealchemist.xpcalc.domain;

public abstract class Entity {
	public long id = -1;
	
	public boolean isNew() {
		return id < 0;
	}
}
