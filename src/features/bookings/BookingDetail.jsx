import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import useDeleteCheckout from "./useDeleteCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { booking, isLoading, error } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteCheckout();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;
  const { status, id } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(id)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          <Modal.Open openWindowName="delete">
            <Button icon={<HiTrash />} variation="danger">
              Delete
            </Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="delete"
            onConfirm={() => deleteBooking(id)}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
