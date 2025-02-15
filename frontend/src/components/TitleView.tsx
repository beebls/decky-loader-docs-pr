import { DialogButton, Focusable, Navigation, staticClasses } from 'decky-frontend-lib';
import { CSSProperties, VFC, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGearFill } from 'react-icons/bs';
import { FaArrowLeft, FaInfo, FaStore } from 'react-icons/fa';

import { useDeckyState } from './DeckyState';

const titleStyles: CSSProperties = {
  display: 'flex',
  paddingTop: '3px',
  paddingRight: '16px',
};

const TitleView: VFC = () => {
  const { activePlugin, closeActivePlugin } = useDeckyState();
  const { t } = useTranslation();

  const onSettingsClick = () => {
    Navigation.CloseSideMenus();
    Navigation.Navigate('/decky/settings');
  };

  const onStoreClick = () => {
    Navigation.CloseSideMenus();
    Navigation.Navigate('/decky/store');
  };

  const onInfoClick = () => {
    Navigation.CloseSideMenus();
    Navigation.Navigate(`/decky/docs/${activePlugin?.name}`);
  };

  if (activePlugin === null) {
    return (
      <Focusable style={titleStyles} className={staticClasses.Title}>
        <div style={{ marginRight: 'auto', flex: 0.9 }}>Decky</div>
        <DialogButton
          style={{ height: '28px', width: '40px', minWidth: 0, padding: '10px 12px' }}
          onClick={onStoreClick}
          onOKActionDescription={t('TitleView.decky_store_desc')}
        >
          <FaStore style={{ marginTop: '-4px', display: 'block' }} />
        </DialogButton>
        <DialogButton
          style={{ height: '28px', width: '40px', minWidth: 0, padding: '10px 12px' }}
          onClick={onSettingsClick}
          onOKActionDescription={t('TitleView.settings_desc')}
        >
          <BsGearFill style={{ marginTop: '-4px', display: 'block' }} />
        </DialogButton>
      </Focusable>
    );
  }

  const CustomTitleView = activePlugin?.titleView
    ? cloneElement(activePlugin.titleView, { onDocsClick: onInfoClick })
    : null;

  return (
    <Focusable className={staticClasses.Title} style={titleStyles}>
      <DialogButton
        style={{ height: '28px', width: '40px', minWidth: 0, padding: '10px 12px' }}
        onClick={closeActivePlugin}
      >
        <FaArrowLeft style={{ marginTop: '-4px', display: 'block' }} />
      </DialogButton>
      {CustomTitleView || (
        <>
          <div style={{ flex: 0.9 }}>{activePlugin.name}</div>
          <DialogButton
            style={{ height: '28px', width: '40px', minWidth: 0, padding: '10px 12px' }}
            onClick={onInfoClick}
          >
            <FaInfo style={{ marginTop: '-4px', display: 'block' }} />
          </DialogButton>
        </>
      )}
    </Focusable>
  );
};

export default TitleView;
