import { SET_REPORT_MODAL_OPEN, SUBMIT_REPORT_MODAL, SubmitReportModalActionPayload } from "./types";

export function openReportModal(title: string) {
  return {
    type: SET_REPORT_MODAL_OPEN,
    payload: {
			open: true,
			title,
		}
  };
}

export function closeReportModal() {
  return {
    type: SET_REPORT_MODAL_OPEN,
    payload: {
			open: false,
			title: '',
		}
  };
}

export const submitReportModal = ({description, email, title}: SubmitReportModalActionPayload) => ({
	type: SUBMIT_REPORT_MODAL,
	payload: {
		description,
		email,
		title,
	},
});
