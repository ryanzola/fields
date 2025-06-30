import npcLogo from '../assets/npc-logo.avif';
import steam from '../assets/steam.avif';
import instagram from '../assets/instagram.avif';
import bluesky from '../assets/bluesky.avif';
import twitter from '../assets/twitter.avif';
import tiktok from '../assets/tiktok.avif';
import tumblr from '../assets/tumblr.avif';

function Footer() {
  return (
    <footer className="md:h-[220px] p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="space-y-2 flex flex-col items-center md:items-start">
        <img className="w-[95px]" src={npcLogo} alt="NPC Studios" />
        <div className="text-xs">
          © 2019-2025 NPC Studio. <a href="/privacy-policy" className="underline hover:text-blue-500">View Privacy Policy</a>
        </div>
      </div>

      <nav aria-label="Social Links" className="">
        <ul className='flex gap-4'>
          <li>
            <a href="https://store.steampowered.com/app/2142790/Fields_of_Mistria/" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={steam} alt="steam" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/fieldsofmistria/" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={instagram} alt="instagram" />
            </a>
          </li>
          <li>
            <a href="http://fieldsofmistria.bsky.social/" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={bluesky} alt="blue sky" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/FieldsofMistria" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@fieldsofmistria" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={tiktok} alt="tiktok" />
            </a>
          </li>
          <li>
            <a href="https://fieldsofmistria.tumblr.com/" target="_blank" rel="noopener noreferrer">
              <img className="w-9 h-9" src={tumblr} alt="tumblr" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
