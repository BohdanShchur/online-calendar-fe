import { gql, useMutation } from "@apollo/client";

const CREATE_EVENT = gql`
    mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
            ... on Event {
            _id
            title
            description
            eventTimeRange {
                start
                end
            }
            notificationTime
            }
            ... on Error {
            statusCode
            message
            }
        }
    }
`;

const UPDATE_EVENT = gql`
    mutation UpdateEvent($event: EventInput!, $eventId: ID!) {
        updateEvent(event: $event, id: $eventId) {
            ... on Error {
            statusCode
            message
            }
            ... on Event {
            _id
            title
            description
            eventTimeRange {
                start
                end
            }
            notificationTime
            }
        }
    }
`;

const DELETE_EVENT = gql`
    mutation DeleteEvent($eventId: ID!) {
        deleteEvent(id: $eventId) {
            ... on Error {
            statusCode
            message
            }
            ... on Event {
            _id
            }
        }
    }
`

export const useCreateEvent = () => {
    return useMutation(CREATE_EVENT);
}

export const useUpdateEvent = () => {
    return useMutation(UPDATE_EVENT);
}

export const useDeleteEvent = () => {
    return useMutation(DELETE_EVENT);
}
