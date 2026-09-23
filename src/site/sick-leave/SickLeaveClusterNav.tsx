import Link from "next/link";
import {
  SICK_LEAVE_CLUSTER_ITEMS,
  SICK_LEAVE_CLUSTER_TITLE,
  SICK_LEAVE_CLUSTER_YOU_ARE_HERE,
  type SickLeaveClusterId,
} from "./cluster";
import "./sick-leave-cluster.css";

interface SickLeaveClusterNavProps {
  current: SickLeaveClusterId;
}

export function SickLeaveClusterNav({ current }: SickLeaveClusterNavProps) {
  const titleId = `sick-leave-cluster-${current}-title`;

  return (
    <nav className="sick-leave-cluster" aria-labelledby={titleId}>
      <p className="sick-leave-cluster__title" id={titleId}>
        {SICK_LEAVE_CLUSTER_TITLE}
      </p>
      <ul className="sick-leave-cluster__list">
        {SICK_LEAVE_CLUSTER_ITEMS.map((item) => {
          const isCurrent = item.id === current;
          return (
            <li
              key={item.id}
              className={
                isCurrent
                  ? "sick-leave-cluster__item sick-leave-cluster__item--current"
                  : "sick-leave-cluster__item sick-leave-cluster__item--related"
              }
              aria-current={isCurrent ? "page" : undefined}
            >
              <p className="sick-leave-cluster__heading">
                {isCurrent ? (
                  <span className="sick-leave-cluster__label">{item.title}</span>
                ) : (
                  <Link href={item.href} className="sick-leave-cluster__link">
                    {item.title}
                  </Link>
                )}
                {isCurrent ? (
                  <span className="sick-leave-cluster__here">
                    {SICK_LEAVE_CLUSTER_YOU_ARE_HERE}
                  </span>
                ) : null}
              </p>
              <p className="sick-leave-cluster__desc">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
