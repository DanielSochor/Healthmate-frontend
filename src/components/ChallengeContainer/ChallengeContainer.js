import React, { useState, useEffect } from 'react';
import Auth, { user } from '../../utilities/authorizer';
import Pubsub from '../../utilities/pubsub';
import Challenge from '../Challenge/Challenge';

function ChallengeContainer() {

    const [challengeListFetched, setChallengeListFetched] = useState(false);
    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        Pubsub.subscribe('login', this, handleLogin);
        Pubsub.subscribe('logout', this, handleLogout);
        Pubsub.subscribe('challenge_joined',this,handleNewChallengeJoined);
        return (() => {
            Pubsub.unsubscribe('login', this);
            Pubsub.unsubscribe('logout', this);
            Pubsub.unsubscribe('challenge_joined',this);
        });
    }, []);

    const handleLogin = () => {
        //this needs to set the state equal to the challenges such as user.challenges_member_of
        setChallengeList([]);
        setChallengeListFetched(true);
    }

    const creatChallenges = () => {

    }

    const handleLogout = () => {
        setChallengeList([]);
        setChallengeListFetched(false);
    }

    const handleNewChallengeJoined = () => {
        Auth.checkForExistingSession();
    }

    const generateChallengeListItems = () => {
        if (!challengeListFetched) {
            return null;
          } else {
            if (challengeList.length && challengeList[0].challenge_id === null) {
              return null;
            } else if (challengeList.length) {
                const items = challengeList.map(item => {
                    return (
                        <Challenge/>
                    );
                });
                return (items);
            } else {
                return "You're not part of any challenges yet";
            }
        }
    }

    return (
        <div>{generateChallengeListItems()}</div>
    )
}

export default ChallengeContainer;