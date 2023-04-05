import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import css from "./Hero.module.scss";
import { motion } from "framer-motion";
import { BiLocationPlus } from "react-icons/bi";
import { IconPlayerPlay, IconShoppingCart,IconHeartHandshake } from "@tabler/icons";
const Hero = () => {
  return (
    <section className={`paddings ${css.wrapper}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`innerWidth ${css.container}`}
      >
        <div className={css.upperElements}>
          <motion.span className="primaryText" variants={fadeIn("right", "tween", 0.2, 1)}>
            Welcome to,
            <br />
            <span><b> SDA KAMPALA </b></span>
            <br/>Central Church.
          </motion.span>
          <motion.span className={`secondaryText`} variants={fadeIn("left", "tween", 0.4, 1)} style={{maxWidth:"25rem"}}>
          For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. 
           - John 3:16 NIV
          </motion.span>
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className={css.person}
        >
          <motion.img variants={slideIn("up", "tween", 0.5, 1.3)}  src="./churchRender.png" alt="" />
        </motion.div>

        {/* <a className={css.email} href="mailto:zainkeepscode@gmail.com">
          zainkeepscode@gmail.com
        </a> */}

        <div className={css.lowerElements}>
          <motion.div variants={fadeIn("right", "tween", 0.3, 1)} className={css.experience}>
            <div className="primaryText"><BiLocationPlus/></div>
            <div className="secondaryText">
              <div>Gadaffi Road Opp. LDC</div>
              <div>Kampala Uganda</div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("left", "tween", 0.5, 1)} className={css.certificate}>
            {/* <img src="./certificate.png" alt="" /> */}
            <motion.span className={`secondaryText`} variants={fadeIn("left", "tween", 0.4, 1)} style={{maxWidth:"25rem", fontSize:"0.7rem", lineHeight:"0.7rem" }}>
         <IconHeartHandshake/> We are building a house for our Lord <br/>& Your Contributions are welcome<IconHeartHandshake/>
          </motion.span>
            <div className={css.flexColGap}>

            <button
                className="btn btn-primary"
                // onClick={() => handleStartwatch()}
                style={{   minWidth:"11rem"}}
              >
                <IconPlayerPlay
                  size={30}
                  strokeWidth={2}
                  color={"white"}
                  style={{ marginRight: "1rem" }}
                />
                LiveStreams
              </button>
              <button
                className="btn btn-success" style={{minWidth:"11rem"}}
                // onClick={() => setToggler(!toggler)}
              >
               
                  <IconShoppingCart
                    size={30}
                    strokeWidth={2}
                    color={"white"}
                    style={{ marginRight: "1rem" }}
                  />
                  E - Giving
             
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
