import React from "react";
import { Edit2, MoreVertical, Trash2 } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Link from "next/link";

const Targetltitem = ({ item }) => {
  return (
    <tr>
      <td className="text-center px-2 align-middle">
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu className="border-0 border-radius-6">
            <Link href="/">
              <DropdownItem
                href="/"
                className="action-vuexy-item"
                // onClick={() => {
                //   router.replace(`idea_catalog/detail/${id}`);
                // }}
              >
                <Edit2 className="mr-2" size={15} />{" "}
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </Link>
            <DropdownItem className="action-vuexy-item w-100">
              <Trash2 className="mr-2" size={15} />{" "}
              <span className="align-middle font-weight-bold">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      <td style={{ textAlign: "center" }}>{item.projectCategory}</td>
      <td style={{ textAlign: "center" }}>{item.sampelType}</td>
      <td style={{ textAlign: "center" }}>{item.jenisPembelian}</td>
      <td style={{ textAlign: "center" }}>{item.sas}</td>
      <td style={{ textAlign: "center" }}>{item.targetLT}</td>
    </tr>
  );
};

export default Targetltitem;
