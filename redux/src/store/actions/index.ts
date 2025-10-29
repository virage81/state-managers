import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export interface FilterContactValues {
	name: string;
	groupId: string;
}

export const FILTER_CONTACTS_ACTION = 'FILTER_CONTACTS_ACTION';
export const FILTER_GROUP_CONTACTS_ACTION = 'FILTER_GROUP_CONTACTS_ACTION';
export const FILTER_FAVORITE_CONTACTS_ACTION = 'FILTER_FAVORITE_CONTACTS_ACTION';

export interface FilterContactsAction {
	type: typeof FILTER_CONTACTS_ACTION;
	payload: Partial<FilterContactValues>;
}
export interface FilterGroupContactsAction {
	type: typeof FILTER_GROUP_CONTACTS_ACTION;
	payload: {
		id: GroupContactsDto['id'];
	};
}
export interface FilterFavoriteContactsAction {
	type: typeof FILTER_FAVORITE_CONTACTS_ACTION;
	payload: void;
}

export const filterContactsActionCreator = (filter: Partial<FilterContactValues>): FilterContactsAction => {
	return { type: FILTER_CONTACTS_ACTION, payload: filter };
};

export const filterGroupContactsActionCreator = (id: GroupContactsDto['id']): FilterGroupContactsAction => {
	return { type: FILTER_GROUP_CONTACTS_ACTION, payload: { id } };
};

export const filterFavoriteContactsActionCreator = (): FilterFavoriteContactsAction => {
	return { type: FILTER_FAVORITE_CONTACTS_ACTION, payload: undefined };
};

export type ProjectActions = FilterContactsAction | FilterGroupContactsAction | FilterFavoriteContactsAction;
