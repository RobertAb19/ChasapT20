import React, { useState, useEffect } from "react";

import { Avatar, CardHeader } from "@material-ui/core";
import { getInitials } from "../../helpers/getInitials";
import { generateColor } from "../../helpers/colorGenerator";
import { i18n } from "../../translate/i18n";

const TicketInfo = ({ contact, ticket, onClick }) => {
	const { user } = ticket;
	const [userName, setUserName] = useState('');
	const [contactNumberShort, setContactNumberShort] = useState('');

	useEffect(() => {
		if (contact?.number) {
			let formattedNumber = contact.number.slice(-6, -3) + ' ' + contact.number.slice(-3);
			if (document.body.offsetWidth < 600 && formattedNumber.length > 10) {
				formattedNumber = formattedNumber.substring(0, 10) + '...';
			}
			setContactNumberShort(formattedNumber);
		}

		if (user && contact) {
			setUserName(`${i18n.t("messagesList.header.assignedTo")} ${user.name}`);
			if (document.body.offsetWidth < 600) {
				setUserName(`${user.name}`);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CardHeader
			onClick={onClick}
			style={{ cursor: "pointer" }}
			titleTypographyProps={{ noWrap: true }}
			subheaderTypographyProps={{ noWrap: true }}
			avatar={
				<Avatar
					style={{
						backgroundColor: generateColor(contact?.number),
						color: "white",
						fontWeight: "bold"
					}}
					src={contact.profilePicUrl}
					alt="contact_image"
				>
					{getInitials(contactNumberShort)}
				</Avatar>
			}
			title={`${contactNumberShort} #${ticket.id}`}
			subheader={ticket.user && `${userName}`}
		/>
	);
};

export default TicketInfo;
