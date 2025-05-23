import type { LayoutProps } from '@directus/extensions';
// CORE CHANGES
// import { Item } from '@/components/v-table/types';
import type { Field, Item, PrimaryKey } from '@directus/types';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getItemRoute } from '../utils/get-route';

export interface UseLayoutClickHandlerOptions {
	props: Pick<LayoutProps, 'selectMode' | 'readonly' | 'collection'>;
	selection: Ref<PrimaryKey[]>;
	primaryKeyField: Readonly<Ref<Field | null>>;
}

export function useLayoutClickHandler({
	props,
	selection,
	primaryKeyField,
}: UseLayoutClickHandlerOptions) {
	const router = useRouter();

	return {
		onClick,
	};

	function onClick({ item, event }: { item: Item; event: MouseEvent }) {
		if (props.readonly === true || !primaryKeyField.value)
			return;

		const primaryKey = item[primaryKeyField.value.field];

		if (props.selectMode || selection.value?.length > 0) {
			selection.value = selection.value?.includes(primaryKey) === false
				? selection.value.concat(primaryKey)
				: selection.value.filter(
						(item: any) => item !== primaryKey,
					);
		}
		else {
			const route = getItemRoute(props.collection, primaryKey);

			if (event.ctrlKey || event.metaKey)
				window.open(router.resolve(route).href, '_blank');
			else router.push(route);
		}
	}
}
