// The `@ariakit/react` barrel drags in Tab, Combobox, Select, Form and the rest, and the published
// bundle has a hard 900,000-byte ceiling. The menu subpath carries only what this file uses.
import * as Ariakit from "@ariakit/react/menu";
import { MoreHorizontal } from "lucide-react";
import { memo } from "react";

/**
 * The overflow menu on a channel row.
 *
 * The row used to carry its actions as inline text buttons. Three of them were 122px wide on a 215px
 * row, so they covered the row's own centre and the reserve that kept them off the name truncated it.
 * One 28px trigger and a floating menu costs the row almost nothing, and the actions get real menu
 * keyboard behaviour instead of being extra tab stops inside a list item.
 */
export type ChannelRowMenu_Item = {
	id: string;
	label: string;
	onSelect: () => void;
};

type ChannelRowMenu_ClassNames = "ChannelRowMenu-trigger" | "ChannelRowMenu-popover" | "ChannelRowMenu-item";

type ChannelRowMenu_Props = {
	channelName: string;
	items: ChannelRowMenu_Item[];
};

export const ChannelRowMenu = memo(function ChannelRowMenu(props: ChannelRowMenu_Props) {
	const { channelName, items } = props;

	return (
		<Ariakit.MenuProvider placement="bottom-end">
			<Ariakit.MenuButton
				className={"ChannelRowMenu-trigger" satisfies ChannelRowMenu_ClassNames}
				aria-label={`Actions for #${channelName}`}
			>
				<MoreHorizontal size={16} aria-hidden="true" />
			</Ariakit.MenuButton>
			{/* Portalled: the sidebar scrolls, and a menu inside it would be clipped by the first row
			    the member opens near the bottom.

			    `unmountOnHide` because every row renders one of these. Ariakit keeps a closed menu in the
			    document by default, so without it a workspace with 50 channels puts 50 hidden menus and
			    all their items in the DOM, and only one can ever be open. */}
			<Ariakit.Menu
				portal
				unmountOnHide
				gutter={4}
				className={"ChannelRowMenu-popover" satisfies ChannelRowMenu_ClassNames}
				aria-label={`Actions for #${channelName}`}
			>
				{items.map((item) => (
					<Ariakit.MenuItem
						key={item.id}
						className={"ChannelRowMenu-item" satisfies ChannelRowMenu_ClassNames}
						onClick={item.onSelect}
					>
						{item.label}
					</Ariakit.MenuItem>
				))}
			</Ariakit.Menu>
		</Ariakit.MenuProvider>
	);
});
