import React from 'react'
import {
  DetailsWrap,
  DetailsItem,
  PreloaderItem,
  TelLink,
} from './CityDetails.elements'
import { formatTel, formatPrice } from '../../../../redux/utils'

const CityDetails = ({ isLoading, details }) => {
  return (
    <DetailsWrap>
      {isLoading ? (
        <>
          <PreloaderItem />
          <PreloaderItem />
          <PreloaderItem />
        </>
      ) : (
        details && (
          <>
            <DetailsItem>{details.address}</DetailsItem>
            <DetailsItem>
              {details.phones.map((phone) => (
                <TelLink
                  href={`tel:${phone}`}
                  title={`Позвонить на номер ${phone}`}
                  key={phone}
                >
                  {formatTel(phone)}
                </TelLink>
              ))}
            </DetailsItem>
            <DetailsItem>
              Стоимость услуги {formatPrice(details.price)} &#8381;
            </DetailsItem>
          </>
        )
      )}
    </DetailsWrap>
  )
}

export default CityDetails
