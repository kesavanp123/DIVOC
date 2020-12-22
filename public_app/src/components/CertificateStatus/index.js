import React, {useEffect, useState} from "react";
import "./index.css";
import CertificateValidImg from "../../assets/img/certificate-valid.svg";
import CertificateInValidImg from "../../assets/img/certificate-invalid.svg";
import NextArrowImg from "../../assets/img/next-arrow.svg";
import LearnProcessImg from "../../assets/img/leanr_more_small.png";
import FeedbackSmallImg from "../../assets/img/feedback-small.png";
import DownloadSmallImg from "../../assets/img/download-certificate-small.png";
import config from "../../config";
import {pathOr} from "ramda";
import {CustomButton} from "../CustomButton";
import {CertificateDetailsPaths} from "../../constants";
import {useDispatch} from "react-redux";
import {addEventAction, EVENT_TYPES} from "../../redux/reducers/events";
import {useHistory} from "react-router-dom";
import axios from "axios";

const jsigs = require('jsonld-signatures');
const {RSAKeyPair} = require('crypto-ld');
const {documentLoaders} = require('jsonld');
const {node: documentLoader} = documentLoaders;
const {contexts} = require('security-context');
const {credentialsv1} = require('../../utils/credentials');
const {vaccinationContext} = require('vaccination-context');

const customLoader = url => {
    const c = {
        "did:india": config.certificatePublicKey,
        "https://w3id.org/security/v1": contexts.get("https://w3id.org/security/v1"),
        'https://www.w3.org/2018/credentials#': credentialsv1,
        "https://www.w3.org/2018/credentials/v1": credentialsv1,
        "https://www.who.int/2020/credentials/vaccination/v1": vaccinationContext
    };
    let context = c[url];
    if (context === undefined) {
        context = contexts[url];
    }
    if (context !== undefined) {
        return {
            contextUrl: null,
            documentUrl: url,
            document: context
        };
    }
    if (url.startsWith("{")) {
        return JSON.parse(url);
    }
    return documentLoader()(url);
};

export const CertificateStatus = ({certificateData, goBack}) => {
    const [isValid, setValid] = useState(false);
    const [data, setData] = useState({});
    const history = useHistory();

    setTimeout(()=>{
        try {
            axios
              .post("/divoc/api/v1/events/", {"date":new Date().toISOString(), "type":"verify"})
              .catch((e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }, 100)

    const dispatch = useDispatch();
    useEffect(() => {
        async function verifyData() {
            try {
                const signedJSON = JSON.parse(certificateData);
                const publicKey = {
                    '@context': jsigs.SECURITY_CONTEXT_URL,
                    id: 'did:india',
                    type: 'RsaVerificationKey2018',
                    controller: 'https://example.com/i/india',
                    publicKeyPem: config.certificatePublicKey
                };
                const controller = {
                    '@context': jsigs.SECURITY_CONTEXT_URL,
                    id: 'https://example.com/i/india',
                    publicKey: [publicKey],
                    // this authorizes this key to be used for making assertions
                    assertionMethod: [publicKey.id]
                };
                const key = new RSAKeyPair({...publicKey});
                const {AssertionProofPurpose} = jsigs.purposes;
                const {RsaSignature2018} = jsigs.suites;
                const result = await jsigs.verify(signedJSON, {
                    suite: new RsaSignature2018({key}),
                    purpose: new AssertionProofPurpose({controller}),
                    documentLoader: customLoader
                });
                if (result.verified) {
                    console.log('Signature verified.');
                    setValid(true);
                    setData(signedJSON);
                    dispatch(addEventAction({
                        type: EVENT_TYPES.VALID_VERIFICATION,
                        extra: signedJSON.credentialSubject
                    }));
                } else {
                    dispatch(addEventAction({type: EVENT_TYPES.INVALID_VERIFICATION, extra: signedJSON}));
                    setValid(false);
                }
            } catch (e) {
                console.log('Invalid data', e);
                setValid(false);
                dispatch(addEventAction({type: EVENT_TYPES.INVALID_VERIFICATION, extra: certificateData}));

            }

        }

        verifyData()

    }, []);
    return (
        <div className="certificate-status-wrapper">
            <img src={isValid ? CertificateValidImg : CertificateInValidImg} alt={""}
                 className="certificate-status-image"/>
            <h3 className="certificate-status">
                {
                    isValid ? "Successful" : "Invalid Certificate"
                }
            </h3>
            {
                isValid && <table className="mt-3">
                    {
                        Object.keys(CertificateDetailsPaths).map((key, index) => {
                            const context = CertificateDetailsPaths[key];
                            return (
                                <tr key={index}>
                                    <td className="pr-3">{key}</td>
                                    <td className="font-weight-bolder">{context.format(pathOr("NA", context.path, data))}</td>
                                </tr>
                            )
                        })
                    }

                </table>
            }
            <CustomButton className="blue-btn m-3" onClick={goBack}>Verify Another Certificate</CustomButton>
            <SmallInfoCards text={"Provide Feedback"}
                            onClick={() => {
                                history.push("/side-effects")
                            }}
                            img={FeedbackSmallImg} backgroundColor={"#FFFBF0"}/>
            <SmallInfoCards text={"Learn about the Vaccination process"} img={LearnProcessImg}
                           onClick={() => {
                                history.push("/learn")
                            }}
                            backgroundColor={"#EFF5FD"}/>
        </div>
    )
};

export const SmallInfoCards = ({text, img, onClick, backgroundColor}) => (
    <div className="small-info-card-wrapper mt-3 mb-3" style={{backgroundColor: backgroundColor}}>
        <div className="w-50 ">
            <img src={img} alt={""} className="small-card-img float-right"/>
        </div>
        <div onClick={onClick}
             className="w-50 d-flex flex-column align-items-start justify-content-center font-weight-bold">
            <span>{text}</span>
            <img src={NextArrowImg} alt={""}/>
        </div>
    </div>
);
