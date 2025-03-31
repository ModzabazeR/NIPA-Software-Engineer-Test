import { AxiosResponse } from "axios";
import axiosInstance from "../axios";
import {
  CreateTicketResponse,
  GetTicketsResponse,
  TicketStatus,
  UpdateTicketStatusResponse,
} from "../types";
import { getToken } from "../utils";

export const getTickets = async () => {
  try {
    const token = getToken();
    const response: AxiosResponse<GetTicketsResponse> = await axiosInstance.get(
      "/tickets",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postCreateTicket = async (
  title: string,
  description: string,
  contactInformation: string
) => {
  try {
    const token = getToken();
    const response: AxiosResponse<CreateTicketResponse> =
      await axiosInstance.post(
        "/tickets/create",
        {
          title,
          description,
          contactInformation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUpdateTicketStatus = async (
  id: string,
  status: TicketStatus
) => {
  try {
    const token = getToken();
    const response: AxiosResponse<UpdateTicketStatusResponse> =
      await axiosInstance.patch(
        `/tickets/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};
