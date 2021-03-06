import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import ReactPlayer from 'react-player';



const AboutScreen = () => {


	const links = [
		`https://youtu.be/M7cXvbZRHFE`,
		`https://youtu.be/bC3dKQIzMJE`,
		`https://youtu.be/PiHu2SL_HO8`,
		`https://youtu.be/nq9MCdURzGs`,
		`https://youtu.be/U1jyJ4mHsKI`,
		`https://youtu.be/c3-Fk4p6lQY`,
		`https://youtu.be/Hom2AehPhK8`,
		`https://youtu.be/alsTmoHMvWk`]

	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
		{ width: 768, itemsToShow: 2 },
		{ width: 1200, itemsToShow: 3 }
	];

	const txt = [`בים הקמעונות יש הרבה דגים. ובשנים הראשונות של מדינת ישראל, הופיעו דגים קטנים רבים ששחו בזרם הכלכלי חברתי
	וניסו לטפח את עסקיהם ולהעניק שירות אישי ושכונתי למרחב בו השתקעו וחיו. אך בחלוף הזמן, החלו מספר דגים
	קטנים לאכול זה את זה ומהר מהר השתנו מי הים הקמעונאי ואותם דגים גדולים ואדירים החלו מאיימים יותר ויותר על
	הדגים הקטנים ולוקחים בעלות ונוכחות על המרחב הימי. התחושה השתררה בים שאין מנוס מהמצב חסר האיזון הזה ורבים
	מהדגים הקטנים חשו תפוסה ותחושה שימיהם ספורים וקצובים עד שיבואו הדגים הגדולים ויאכלו גם אותם. אבל אז קרה
	דבר קסם בים, משהו שלא ציפו לו והפתיע את כל יושבי הים הגדולים והקטנים כאחד! נוצרה תנועה שקטה אך עוצמתית
	של הדגים הקטנים שהחלו מתקבצים יחד ונעים מנקודה לנקודה תוך שחיה משותפת בצורה המחקה דג גדול ואדיר מימדים,
	אשר הפחיד וניטרל את כל אותם דגים גדולים ומאיימים והחזיר לדגים הקטנים את כוח ההרתעה שלהם בים והשיב להם את
	חיוניותם ועוצמתם לנוע במרחבי הים הקמעונאי כגוף גדול , יצירתי וחכם על פני אלו שביקשו לנטרל ולאכול אותו.`
	.replaceAll(".", ".&"),
	`
	צמחנו מעולם הקמעונאות, כבעלי מרכולים ועסקים קטנים ממש כמוכם, חווינו אתגרים עם כניסתם של שחקנים גדולים
	ורבי השפעה לשוק הריכוזי ביותר בישראל בשנים האחרונות, עברנו התמודדויות לא פשוטות בניסיון להישאר רלוונטיים
	גם בעידן החדש והטכנולוגי שתופס תאוצה לאחרונה, ומעל הכל, הרגשנו שלא גודל העסק הוא שקובע אלא גודל הלב,
	הנחישות לא רק לשרוד את היום , אלא גם להתעלות ולהצליח בעסקים מעוצמת הביחד שלנו, שותפות הגורל לאותם מצוקות
	וצרכים וגם להפוך את הלימון שלנו ללימונדה, לראות איך אנו יכולים להתאגד ובעזרת משרדי הממשלה ועמותת פורום
	מזון ומכולת, אנו יכולים יחדיו ליצור פתרונות כלכלים וחברתיים למצוקות שבמחוזותינו מחד ומאידך, תמיד להיות
	בצד שנותן ומעניק חסות ושומר על אלו הקטנים מאיתנו, משפחות רווחה ואנשים נזקקים וחלשים שאנו מכירים מהשטח
	ומהשכונות בהן אנו פועלים ובכך יכולים תמיד להיות בצד המטיב והמסייע בחברה בישראל. בצד שהופך את המידות שלנו
	, למידות טובות של נתינה מן המעט שיש ושל עזרה הדדית. כך יצרנו את עמותת פורום מזון ומכולת שנוצרה מתוך צורך
	לחשוב מחוץ לקופסה אל מול פני המציאות שכולנו חווים ושורדים, זאת בכדי למצוא אלטרנטיבות לשינוי שעובר על
	כולנו ולייצר פתרון שהוא גם כלכלי וגם חברתי לרווחת כלל העסקים הקטנים והמכולות בישראל וגם לרווחת אוכלוסיות
	השוליים שאנו יכולים להרתם יחדיו לטובתם ובכך להיות גוף חברתי כלכלי חזק, יצירתי ועוצמתי בישראל גם בעידן
	החדש והטכנולוגי הבא עלינו לטובה.`
	.replaceAll(".", ".&"),
	`
	עמותת פורום מזון ומכולת בתמיכת משרד הכלכלה והתמ"ת מציעה תוכנית פעולה מקיפה המאגדת את כלל המכולות והעסקים
	הקטנים בישראל, מעניקה לה יתרון יחסי מעוצמת הביחד דרך שירותי מחסן לוגיסטי, מחירים אטרקטיבים, הנגשה של
	אפליקציית משלוחים לפי אזורים ועזרה במרכזי הדרכה ובהכשרות לטובת המעבר לעידן החדש והטכנולוגי, ועוד במטרה
	להשתוות ל"דגים הגדולים" סביבנו מבחינת שירות, טכנולוגיה, מחירים, שיווק ופרסום ולתת תחרות בריאה ושוות
	אמצעים שרק תסייע ותוזיל בכך את סל הקניות בישראל לרווחת כלל תושביה. וגם תאפשר לנו להגדיל מעשה מכוח
	אחדותנו ולהפוך את ההכרות שלנו האישית והשכונתית עם משפחות הרווחה והמצוקה בקרבנו ולהעניק להם ביטחון תזונתי
	משמעותי דרך פתרונות קהילתיים כגון תלושי מזון, סל מוצרים מוזל, הטבות ותרומות שיוכלו בכך לחזק את השכבה
	החלשה ביותר במדינת ישראל ולהפוך אותנו לגדולים, במידות טובות ובעסקים טובים לתפארת מדינת ישראל.
	`.replaceAll(".", `.&`)

	]

	return (
		<Container>
			<BackToMain>
				<Link className="close-button" to="/">חזרה לעמוד הבית</Link>
			</BackToMain>
			<Title>הסיפור שלנו</Title>
			<HrLine />
			<BigText>נעים להכיר, אנחנו עמותה חברתית כלכלית שבאה להציע שינוי בעולם הקמעונות בישראל.</BigText>
			<HrLine />
			<Text>
			{txt[0].split(`&`).map(e => <p>{e}</p>)}
			</Text>
			<BigText>הסיפור הזה הוא הסיפור שלנו!</BigText>
			<HrLine />
			<Text>
				{txt[1].split(`&`).map(e => <p>{e}</p>)}
			</Text>
			<BigText>מה הרעיון שלנו?</BigText>
			<HrLine />
			<Text>
				{txt[2].split(`&`).map(e => <p>{e}</p>)}
			</Text>
			<BigText>רגע, איך אפשר לעשות את כל השינוי הזה?</BigText>
			<HrLine />
			<Text>פשוט זה לא, אבל גם לא כל כך מסובך…נסביר את השינוי בשלושה צעדים:</Text>
			<br/>
			<ol type="1">
				<ListText>
					נאגד את כלל המכולות והעסקים הקטנים תחת מעטפת לוגיסטית אחידה שתעניק שירותים משמעותיים בפריסה ארצית,
					כגון: מחסן לוגיסטי, שירותי משלוחים, מחירים אטרקטיבים מספקים, יבואנים, חקלאים ויצרנים קטנים כגדולים.
				</ListText>
				<br/>
				<ListText>
					נשלב תהליך אוטומציה בעזרת מערכות מחשוב מתקדמות שיסייעו לנו לקדם את כלל העסקים הקטנים והמכולות וליישר
					קו עם הקמעונות המודרנית של העידן החדש.
				</ListText>
				<br/>
				<ListText>
					ננהל מאגר נזקקים ונפעל לאגד את גיוס התרומות בכדי להשיב לקהילה ולחזק את השכבות החלשות דרך ביטחון
					תזונתי משמעותי.
				</ListText>
			</ol>
			<BigText>נשמע לי מעולה, איך אוכל להצטרף אליכם?</BigText>
			<HrLine />
			<Text>
				שלוש דרכים קלות ופשוטות להצטרף אלינו עוד היום ולקחת חלק במיזם הכלכלי חברתי שעתיד לשנות את פני הים
				הקמעונאי בו אנו שוחים כיום:
			</Text>
			<HrLineSmall />
			<OL>
				<ListText>
					מוזמנים להכנס לאתר עמותת פורום מזון ומכולת- makolot.org.il
					<br />
					להכנס לדף המצטרפים , להשאיר פרטים ונשמח ליצור עימכם קשר בהקדם</ListText>
				<ListText>ניתן לשלוח מייל לאימייל של העמותה בכתובת: elistavi@gmail.com</ListText>
				<ListText>ניתן ליצור קשר טלפוני עם העמותה דרך הסלולרי : 055-6663999</ListText>
				<ListText>או לשלוח הודעה לוואטס אפ של העמותה בטלפון: 055-6663999</ListText>
			</OL>
			<HrLine />
			<BigText>
				אתם עדיין חושבים על זה?<br/> אל תחשבו כמו דג קטן, אתם הרבה יותר גדולים משנדמה לכם!<br/> בואו לקחת חלק
				במהפכה הקמעונאית האדירה שניצור יחדיו בים האפשרויות הגדול של הכלכלה והחברה בישראל!
			</BigText>
			<HrLine />
			<Title>העמותה בתקשורת</Title>
			<HrLineSmall />
			<Carousel breakPoints={breakPoints} isRTL={false} >
				{links.map((item, index) => (
					<ReactPlayer width="98%" controls={true} url={item} key={index} />
				))}
			</Carousel>
		</Container>
	);
};

const Container = styled.div`
	 {
		padding-top: 1rem;
        margin-top: 6em;
        padding-bottom: 8em;
		display: flex;
		flex-direction: column;
        align-items: center;
		direction: rtl;
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(1rem);
		z-index: 1;
		height: 100%;
		width:100%;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
        overflow-y:scroll;
        overflow-x:hidden;
	}
`;

const BackToMain = styled.span`{
	position: absolute;
	top: 5%;
	left: 7%;
	font-size: 1rem;
}`

const Title = styled.div`
	{
		font-size: 3.5rem;
		font-weight: bold;
		background: -webkit-linear-gradient(-90deg, white, navy);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 1px lightgrey;
	}
`;

const BigText = styled.div`
	{
		font-size: 2rem;
		color: navy;
		text-shadow: 0px 0px 2px grey;
        text-align: center;
		
    }
`;

const Text = styled.span`
	{
		font-size: 1.2rem;
        text-align: right;
		width: 75%;
		text-shadow: 0px 0px 1px grey;
	}
`;

const ListText = styled.li`
	{
		font-size: 1.1rem;
        text-shadow: 0px 0px 1px black;
        text-align: right;
		margin-right: 12rem;
		width:80%;
	}
`;

const HrLine = styled.hr`{
    width: 85%;
}`
const HrLineSmall = styled.hr`{
    width: 45%;
}`

const OL = styled.ol`{
	type="1";
	width:50%;
}`

export default AboutScreen;
