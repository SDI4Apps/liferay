package cz.ccss.mapViewer;

import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.servlet.SessionMessages;
import com.liferay.portal.kernel.util.Constants;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portlet.PortletPreferencesFactoryUtil;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import javax.portlet.PortletPreferences;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

public class ConfigurationActionImpl implements ConfigurationAction {
    public void processAction(PortletConfig portletConfig,
            ActionRequest actionRequest, ActionResponse actionResponse)
            throws Exception {

        String cmd = ParamUtil.getString(actionRequest, Constants.CMD);

        if (!cmd.equals(Constants.UPDATE)) {
            return;
        }

        String compurl = ParamUtil.getString(actionRequest, "compurl");

        String portletResource = ParamUtil.getString(actionRequest,
                "portletResource");
        PortletPreferences preferences = PortletPreferencesFactoryUtil
                .getPortletSetup(actionRequest, portletResource);

        preferences.setValue("compurl", compurl);

        preferences.store();

        SessionMessages.add(actionRequest, portletConfig.getPortletName()
                + ".doConfigure");
    }

    public String render(PortletConfig portletConfig,
            RenderRequest renderRequest, RenderResponse renderResponse)
            throws Exception {

        return "/html/config.jsp";
    }
}