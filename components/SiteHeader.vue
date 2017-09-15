<template>
  <header class="container" v-on:mouseleave="closeMenu('hover')">
    <nav>
      <nuxt-link to="/" class="logo">
        <img src="~static/img/logo.png" />
      </nuxt-link>
      <div class="menu-main-menu-container">
        <input type="checkbox" id="menutoggle" ref="menutoggle" >
        <label for="menutoggle" onclick><i class="icon-menu"></i></label>
        <span class="menu-holder" :class="{mobilesubactive: mobileactivemenu}">
          <ul id="menu-main-menu" class="menu" ref="menu">
            <label for="menutoggle" onclick><i class="icon-cancel-circled"></i></label>
            <li v-for="(item, index) in structure" v-if="!menu[item].children" v-on:mouseover="closeMenu('hover')">
              <nuxt-link v-on:click.native="closeMenu()" :to="menu[item].slug">{{menu[item].title}}</nuxt-link>
            </li>
            <li v-else v-on:mouseover="openSubmenu(menu[item], index)" v-on:click="openSubmenu(menu[item], index, true)" :class="{active: activelink === index, mobileactive: mobileactivelink === index}">
              <span class="submenutoggle">
                {{menu[item].title}}<i class="icon-angle-down"></i>
              </span>
            </li>
          </ul>
          <transition name="grow">
            <ul class="mobilesubmenu" v-if="mobileactivemenu" >
              <li v-for="entry in mobilesubmenu">
                <nuxt-link v-on:click.native="closeMenu()" :to="entry.slug" v-html="entry.title"></nuxt-link>
              </li>
            </ul>
          </transition>
        </span>
      </div>
      <div id="submenu-main-menu" :class="[activemenu ? 'open' : '', 'row']">
        <div class="col-4" v-for="entry in submenu">
          <nuxt-link v-on:click.native="closeMenu()" :to="entry.slug" >
            <h4 v-html="entry.title"></h4>
          </nuxt-link>
          <p>{{entry.description}}</p>
          <ul v-if="submenus[entry.ID]">
            <li v-for="subentry in submenus[entry.ID]">
              <nuxt-link v-on:click.native="closeMenu()" :to="submenuUrl(subentry.slug, entry.slug)">{{subentry.title}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <ol id="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" v-for="(breadcrumb, index) in breadcrumbs">
        <nuxt-link :to="breadcrumb.address" itemscope itemtype="http://schema.org/Thing" itemprop="item">
          <span itemprop="name">{{breadcrumb.name}}</span>
        </nuxt-link>
        <meta itemprop="position" :content="(index + 1)" />
      </li>
    </ol>
  </header>
</template>

<script>
export default {
  computed: {
    breadcrumbs () {
      let output = [{
        address: '/',
        name: 'Home'
      }]
      let address = ''
      var split = this.$route.path.split('/')
      split.forEach(function (crumb, index) {
        if (crumb !== '') {
          address += '/' + crumb
          output.push({
            address: address,
            name: crumb.replace(/-/g, ' ')
          })
        }
      })
      if (output.length > 3) {
        let croppedOutput = [output[0], output[1], output[(output.length - 1)]]
        return croppedOutput
      } else {
        return output
      }
    },
    menu () {
      return this.$store.state.menu.menu
    },
    submenus () {
      return this.$store.state.menu.submenus
    },
    structure () {
      return this.$store.state.menu.structure
    }
  },
  data () {
    return {
      submenu: [],
      activemenu: false,
      activelink: false,
      mobilesubmenu: [],
      mobileactivemenu: false,
      mobileactivelink: false
    }
  },
  methods: {
    closeMenu (mode = 'click') {
      if ((mode === 'hover' && window.innerWidth > 768) || mode === 'click') {
        this.activemenu = false
        this.$refs.menutoggle.checked = false
        this.activelink = false
        this.mobileactivemenu = false
        this.mobileactivelink = false
      }
    },
    openSubmenu (entry, index, mobile = false) {
      if (window.innerWidth >= 768 && mobile === false) {
        this.submenu = entry.children
        this.activemenu = true
        this.activelink = index
      } else if (window.innerWidth < 768 && mobile === true) {
        if (this.mobileactivemenu === false) {
          this.mobilesubmenu = entry.children
          this.mobileactivemenu = true
          this.mobileactivelink = index
        } else {
          this.mobilesubmenu = []
          this.mobileactivemenu = false
          this.mobileactivelink = false
        }
      }
    },
    closeSubmenu () {
      this.mobileactivemenu = false
      this.mobileactivelink = false
    },
    submenuUrl (url, parent) {
      if (parent.endsWith('/')) {
        parent = parent.slice(0, -1)
      }
      if (url.startsWith('#') && url.length > 1) {
        return parent + '/' + url
      } else if (url.startsWith('#')) {
        return parent + '/'
      } else {
        return url
      }
    }
  }
}
</script>
